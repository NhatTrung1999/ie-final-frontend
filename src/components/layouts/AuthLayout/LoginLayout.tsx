import { useForm, type SubmitHandler } from 'react-hook-form';
import Lottie from 'lottie-react';
import useWindowSize from '../../../hooks/useWindowSize';
import { Button, Div, Form, Input, Label, Option, Select } from '../../ui';
import loadingData from '../../../assets/lotties/loading.json';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router';
import { login } from '../../../features/auth/authSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const loginPayload = {
      account: data.account,
      password: data.password,
      factory: data.factory,
    };
    const resultAction = await dispatch(login(loginPayload));
    if (login.fulfilled.match(resultAction)) {
      navigate('/');
    }
  };

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
            <Input
              id="account"
              autoComplete="off"
              className="w-full"
              ariaInvalid={errors.account ? 'true' : 'false'}
              {...register('account', { required: true })}
            />
            {errors?.account?.type === 'required' && (
              <p role="alert" className="text-red-500">
                Please do not it blank!
              </p>
            )}
          </Div>
          <Div className="w-full">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              autoComplete="off"
              className="w-full"
              {...register('password', { required: true })}
              ariaInvalid={errors.password ? 'true' : 'false'}
            />
            {errors?.password?.type === 'required' && (
              <p role="alert" className="text-red-500">
                Please do not it blank!
              </p>
            )}
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
            {isLoading ? 'Loading...' : 'Login'}
          </Button>
        </Form>
      </Div>
    </Div>
  );
};

export default LoginLayout;
