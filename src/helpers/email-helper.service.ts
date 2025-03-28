import { Injectable } from '@nestjs/common';
import { Regex } from '../const-values/regex';

@Injectable()
export class EmailHelperService {
  isAnEmail(possibleEmail: string): boolean {
    return Regex.EMAIL.test(possibleEmail);
  }
}
