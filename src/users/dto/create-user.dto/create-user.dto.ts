import {
  IsEmail,
  IsString,
  IsEnum,
  IsOptional,
  IsDate,
  MinLength,
  Matches,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsEnum(['patient', 'staff', 'admin'])
  userType: string;

  @IsEnum(['Mr', 'Mrs', 'Miss', 'Rev', 'Dr', 'Prof'])
  title: string;

  @IsString()
  @MinLength(1)
  firstName: string;

  @IsString()
  @MinLength(1)
  lastName: string;

  @IsString()
  nic: string;

  @IsString()
  @Matches(/^[0-9]{10}$/, {
    message: 'Please enter a valid 10-digit mobile number',
  })
  mobile: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  // Patient specific fields
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateOfBirth?: Date;

  @IsOptional()
  @IsEnum(['right', 'left', 'both'])
  affectedEye?: string;

  @IsOptional()
  @IsString()
  medicalHistory?: string;

  @IsOptional()
  @IsString()
  allergies?: string;

  // Staff specific fields
  @ValidateIf((o: CreateUserDto) => o.userType === 'staff')
  @IsEnum(['Consultant Ophthalmologist', 'Staff Nurse'])
  staffRole?: string;

  @IsOptional()
  @IsString()
  registrationId?: string;

  // Admin specific fields
  @ValidateIf((o: CreateUserDto) => o.userType === 'admin')
  @IsEnum([
    'Clinical Operations Manager',
    'General Admin',
    'Business Development Team',
  ])
  adminDesignation?: string;
}
