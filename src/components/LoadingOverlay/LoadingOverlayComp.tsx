import toast, { Toaster } from 'react-hot-toast';

import Board from 'react-trello-ts';
import Tag from '../Main/DetailProject/Tag/Tag';
import LoadingOverlay from 'react-loading-overlay-ts';
import Loading2 from '../../assets/svg/Loading2';

export default function Example() {
  return (
    <LoadingOverlay 
    active={true}
      spinner={<Loading2/>}
    >
      <div>abc</div>
    </LoadingOverlay>
  );
}
