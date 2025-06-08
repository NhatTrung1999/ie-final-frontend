import { useForm, type SubmitHandler } from 'react-hook-form';
import Lottie from 'lottie-react';
import useWindowSize from '../../../hooks/useWindowSize';
import { Button, Div, Form, Input, Label, Option, Select } from '../../ui';
import loadingData from '../../../assets/lotties/loading.json';

const dataFac: { name: string; value: string }[] = [
  { name: '---Choose Factory---', value: '' },
  { name: 'LYV', value: 'LYV' },
  { name: 'LHG', value: 'LHG' },
  { name: 'LVL', value: 'LVL' },
  { name: 'LYM', value: 'LYM' },
];

interface IFormInput {
  account: string;
  password: string;
  factory: string;
}

const LoginLayout = () => {
  const { width, height } = useWindowSize();
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <Div
      style={{ height, width }}
      className="border-2 flex justify-center items-center bg-gray-100"
    >
      <Div
        style={{ height: height - 400, width: width - 600 }}
        className="rounded-md flex p-3 shadow-2xs bg-white"
      >
        <Div className="flex-1 flex justify-center items-center">
          <Lottie animationData={loadingData} />
        </Div>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col justify-evenly items-center px-5 bg-gray-200 rounded-md"
        >
          <Div className="text-3xl font-bold text-blue-500">Login</Div>
          <Div className="w-full">
            <Label htmlFor="account">Account</Label>
            <Input id="account" className="w-full" {...register('account')} />
          </Div>
          <Div className="w-full">
            <Label htmlFor="password">Password</Label>
            <Input id="password" className="w-full" {...register('password')} />
          </Div>
          <Div className="w-full">
            <Label htmlFor="factory">Factory</Label>
            <Select id="factory" {...register('factory')}>
              {dataFac.map((item, index) => (
                <Option key={index} value={item.value} name={item.name} />
              ))}
            </Select>
          </Div>
          <Button
            type="submit"
            className="w-full cursor-pointer bg-blue-500 p-2 rounded-md text-lg text-white font-semibold"
          >
            Login
          </Button>
        </Form>
      </Div>
    </Div>
  );
};

export default LoginLayout;
