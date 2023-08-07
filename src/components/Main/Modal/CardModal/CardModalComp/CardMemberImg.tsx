import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as userSlice from '../../../../../redux/reducers/userSlice'
import { userSelector } from '../../../../../redux/selectors'
import { Member } from '../../../../../types/Member.type'

interface CardMemberImgProps {
  member: Member
}

const CardMemberImg = ({member}: CardMemberImgProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userSlice.findById(member.userId))
  },[member])

  const users = useSelector(userSelector).users;
  const usersFilter = users.filter(user => user.id === member.userId);

  const memberElement = usersFilter.map(user => <img key={user.id} src={user.imageUrl} className="w-[32px] mr-1 rounded-[50%] h-[32px]" alt="" />)
  return (
    <div>{memberElement}</div>
  )
}

export default CardMemberImg