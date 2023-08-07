import React, { useContext, useEffect } from 'react';
import { Member } from '../../../types/Member.type';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../redux/selectors';
import { User } from '../../../types/User.type';

interface MemberImagesProps {
  member: Member;
  users: User[];
}

const MemberImages = ({ member, users }: MemberImagesProps) => {
  
  
  const imageElement = users.map(user => <img key={user.id} src={user.imageUrl} className="w-[32px] rounded-[50%] h-[32px]" alt="" />)

  return (
    <div>
      {imageElement}
    </div>
  );
};

export default MemberImages;
