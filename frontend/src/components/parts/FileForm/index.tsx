import { useCallback, useEffect, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { uploadImage } from '@/repositories/images';

const FileForm = () => {
  const { register, handleSubmit } = useForm();
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      toast.success('Image uploaded successfully');

      queryClient.invalidateQueries({ queryKey: ['images'] });

      setSelectedFileName(null);
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const onSubmit = useCallback(
    (data: any) => {
      setIsLoading(true);
      const formData = new FormData();

      formData.append('image', data.image[0]);

      uploadMutation.mutate(formData);
    },
    [uploadMutation]
  );

  useEffect(() => {
    if (uploadMutation.isSuccess) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [uploadMutation.isSuccess]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedFileName(file.name);
    }
  };

  return (
    <div className=" font-sans text-gray-900border-box">
      <div className="flex justify-center w-full mx-auto sm:max-w-lg">
        <div
          className="flex flex-col items-center justify-center w-full h-auto my-20
         bg-white sm:w-3/4 sm:rounded-lg sm:shadow-xl"
        >
          <div className="mt-10 mb-10 text-center">
            <h2 className="text-2xl font-semibold mb-2">Upload your files</h2>
            <p className="text-xs text-gray-500">
              File should be of format jpg, jpeg, or png
            </p>
          </div>
          <form
            action="#"
            className="relative w-4/5 h-32 max-w-xs mb-10 bg-white  rounded-lg shadow-inner"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              id="file-upload"
              type="file"
              className="hidden"
              {...register('image', { onChange: handleFileChange })}
            />
            <label
              htmlFor="file-upload"
              className="z-20 flex flex-col-reverse items-center justify-center w-full h-28 cursor-pointer"
            >
              <p className="z-10 text-xs font-light text-center text-gray-500">
                {selectedFileName ? (
                  <span>{selectedFileName}</span>
                ) : (
                  'Drag & Drop your files here'
                )}
              </p>
              <svg
                className="z-10 w-8 h-8 text-indigo-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
              </svg>
            </label>
            <button
              className="btn btn-block bg-indigo-500 text-white "
              type="submit"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                'Upload'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FileForm;
