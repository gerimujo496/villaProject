// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { addVilla as addVillaApi } from '../services/villas';
// import { Villas } from '../types/types';
// import { message } from 'antd';

// export const useAddVilla = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: addVillaApi,
//     onSuccess: () => {
//       queryClient.invalidateQueries(['villas']);
//       message.success('Villa added successfully');
//     },
//     onError: () => {
//       message.error('Failed to add villa');
//     },
//   });
// };
