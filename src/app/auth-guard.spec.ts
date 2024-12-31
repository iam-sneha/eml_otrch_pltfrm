import { AuthGuard } from './auth-guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let service = AuthService;
  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });
});
