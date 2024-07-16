import { FC, useState } from 'react';

import SvgIcon from '@/components/SvgIcon';
import TextInput, { TextInputProps } from '@/components/TextInput';

const PasswordInput: FC<TextInputProps> = (props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <TextInput
      endAdornment={
        <button type='button' onClick={() => setIsPasswordVisible((p) => !p)}>
          {isPasswordVisible ? (
            <SvgIcon name='show' />
          ) : (
            <SvgIcon name='hide' />
          )}
        </button>
      }
      type={isPasswordVisible ? 'text' : 'password'}
      {...props}
    />
  );
};

export default PasswordInput;
