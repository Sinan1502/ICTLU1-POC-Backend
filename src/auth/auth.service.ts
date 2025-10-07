import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { loginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schemas/refresh-token.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(RefreshToken.name) private RefreshTokenModel: Model<RefreshToken>,
    private jwtService: JwtService,
  ) { }


  async signup(signupData: SignupDto) {
    const { email, password, name } = signupData;

    const emailInUse = await this.UserModel.findOne({
      email,
    });
    if (emailInUse) {
      throw new BadRequestException("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
  }
  async login(credentials: loginDto) {
    const { email, password } = credentials;
    const user = await this.UserModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    return this.generateUserTokens(user._id);

    return { message: 'Login successful' };

  }

  async refreshTokens(refreshToken: string) {
    const token = await this.RefreshTokenModel.findOneAndDelete({
      token: refreshToken,
      expiryDate: { $gt: new Date() }
    });

    if (!token) {
      throw new BadRequestException('Invalid or expired refresh token');
    }

    return this.generateUserTokens(token.userId);
  }

  async generateUserTokens(userId) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '1h' });
    const refreshToken = uuidv4();

    await this.storeRefreshToken(refreshToken, userId);

    return { accessToken, refreshToken, message: 'Login successful' };
  }

  async storeRefreshToken(token: string, userId) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3); // 7 days validity
    await this.RefreshTokenModel.create({ token, userId, expiryDate });
  }

}

