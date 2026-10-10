
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    if (username !== 'johndoe' || password !== 'susiairtest') {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Invalid username or password',
      });
    }

    const payload = { sub: username };

    return {
      access_token: await this.jwtService.signAsync(payload),
      token_type: 'Bearer',
    };
  }
}
