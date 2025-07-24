import { useForm, type SubmitHandler } from 'react-hook-form';
import { Button, Div, Form, Input, Label, Option, Select } from '../ui';
import type { IFormModal } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect, useRef, useState } from 'react';
import {
  getVideo,
  resetError,
  resetMessage,
  setFormValues,
  uploadVideo,
} from '../../features/stagelist/stagelistSlice';
import { toast } from 'react-toastify';

const Modal = ({ setIsOpen }: { setIsOpen?: (isOpen: boolean) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormModal>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
    },
  });
  const { user } = useAppSelector((state) => state.auth);
  const { formValues, search, error, message } = useAppSelector(
    (state) => state.stagelist
  );
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const dispatch = useAppDispatch();
  // const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    dispatch(resetError());
    dispatch(resetMessage());
  }, [dispatch]);

  useEffect(() => {
    if (formValues) {
      setValue('date', formValues.date);
      setValue('season', formValues.season);
      setValue('stage', formValues.stage);
      setValue('area', formValues.area);
      setValue('article', formValues.article);
    }
  }, [formValues, setValue]);

  useEffect(() => {
    if (error) {
      toast.dismiss();
      toast.error(error);
      setUploadProgress(0);
      return;
    }
  }, [error]);

  useEffect(() => {
    if (message) {
      toast.dismiss();
      setUploadProgress(0);
      toast.success(message);
    }
  }, [message]);

  const onSubmit: SubmitHandler<IFormModal> = async (data) => {
    // console.log(user);
    // abortControllerRef.current = new AbortController();
    abortControllerRef.current = new AbortController();
    const { date, season, stage, area, article, video } = data;
    if (video.length > 5) {
      toast.warn('Maximum 5 videos!');
      return;
    } else {
      dispatch(setFormValues({ date, season, stage, area, article }));
      const uploadResult = await dispatch(
        uploadVideo({
          payload: {
            date,
            season,
            stage,
            area,
            article,
            video,
            created_by: user?.account || 'unknown',
            signal: abortControllerRef.current.signal,
          },
          onProgress: (progress: number) => setUploadProgress(progress),
        })
      );

      if (uploadVideo.fulfilled.match(uploadResult)) {
        setIsOpen?.(false);
        dispatch(getVideo(search || {}));
        dispatch(resetMessage());
      }
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsOpen?.(false);
    setUploadProgress(0);
    dispatch(resetError());
    dispatch(resetMessage());
  };

  return (
    <Div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <Div className="relative p-4 w-full max-w-md max-h-full">
        <Div className="relative bg-white rounded-lg shadow-sm">
          <Div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">
              Modal Upload Video
            </h3>
            <Button
              type="button"
              handleClick={() => {
                dispatch(resetError());
                dispatch(resetMessage());
                setIsOpen?.(false);
              }}
              className="cursor-pointer end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </Button>
          </Div>
          <Div className="p-4 md:p-5">
            <Form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <Div>
                <Label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Date
                </Label>
                <Input
                  type="date"
                  id="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none rounded-lg block w-full p-2.5"
                  {...register('date', { required: true })}
                  ariaInvalid={errors.date ? 'true' : 'false'}
                  autoComplete="off"
                />
                {errors?.date?.type === 'required' && (
                  <p role="alert" className="text-red-500">
                    Please do not it blank!
                  </p>
                )}
              </Div>

              <Div>
                <Label
                  htmlFor="season"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Season
                </Label>
                <Input
                  type="text"
                  id="season"
                  placeholder="Enter your season..."
                  {...register('season', { required: true })}
                  ariaInvalid={errors.season ? 'true' : 'false'}
                  autoComplete="off"
                  className="bg-gray-50 border uppercase border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
                />
                {errors?.season?.type === 'required' && (
                  <p role="alert" className="text-red-500">
                    Please do not it blank!
                  </p>
                )}
              </Div>

              <Div>
                <Label
                  htmlFor="stage"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Stage
                </Label>
                <Select
                  id="stage"
                  {...register('stage', { required: true })}
                  {...{ ['aria-invalid']: errors.stage ? 'true' : 'false' }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
                >
                  <Option value="" name="---Choose Option---" />
                  <Option value="Pullover" name="Pullover" />
                  <Option value="CR0" name="CR0" />
                  <Option value="CR1" name="CR1" />
                  <Option value="CR2" name="CR2" />
                  <Option value="SMS" name="SMS" />
                  <Option value="CS1" name="CS1" />
                  <Option value="CS2" name="CS2" />
                  <Option value="Customer" name="Customer" />
                </Select>
                {errors?.stage?.type === 'required' && (
                  <p role="alert" className="text-red-500">
                    Please do not it blank!
                  </p>
                )}
              </Div>

              <Div>
                <Label
                  htmlFor="area"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Area
                </Label>
                <Select
                  id="area"
                  {...register('area', { required: true })}
                  {...{ ['aria-invalid']: errors.area ? 'true' : 'false' }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
                >
                  <Option value="CUTTING" name="CUTTING" />
                  <Option value="STITCHING" name="STITCHING" />
                  <Option value="ASSEMBLY" name="ASSEMBLY" />
                  <Option value="STOCKFITTING" name="STOCKFITTING" />
                  <Option value="NOSEW" name="NOSEW" />
                </Select>
                {errors?.area?.type === 'required' && (
                  <p role="alert" className="text-red-500">
                    Please do not it blank!
                  </p>
                )}
              </Div>

              <Div>
                <Label
                  htmlFor="article"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Article
                </Label>
                <Input
                  type="text"
                  id="article"
                  placeholder="Enter your article..."
                  {...register('article', { required: true })}
                  ariaInvalid={errors.article ? 'true' : 'false'}
                  autoComplete="off"
                  className="bg-gray-50 border border-gray-300 uppercase text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
                />
                {errors?.article?.type === 'required' && (
                  <p role="alert" className="text-red-500">
                    Please do not it blank!
                  </p>
                )}
              </Div>

              <Div>
                <Label
                  htmlFor="video"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Video
                </Label>
                <Input
                  type="file"
                  id="video"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
                  {...{ multiple: 'multiple', accept: 'video/*' }}
                  {...register('video', {
                    required: 'Please select at least one video!',
                  })}
                  ariaInvalid={errors.video ? 'true' : 'false'}
                />
                {errors?.video?.type === 'required' && (
                  <p role="alert" className="text-red-500">
                    {errors.video.message}
                  </p>
                )}
              </Div>

              <Div className="flex gap-x-2">
                <Button
                  type="submit"
                  disabled={uploadProgress > 0 ? true : false}
                  className={`w-full text-white bg-blue-500  ${
                    uploadProgress > 0
                      ? 'hover:cursor-not-allowed'
                      : 'hover:bg-blue-600'
                  } cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                >
                  {uploadProgress > 0
                    ? `Uploading...${uploadProgress}%`
                    : 'Upload'}
                </Button>

                <Button
                  type="button"
                  handleClick={handleCancel}
                  className="w-full text-white bg-red-500 hover:bg-red-600 cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Cancel
                </Button>
              </Div>
            </Form>
          </Div>
        </Div>
      </Div>
    </Div>
  );
};

export default Modal;
