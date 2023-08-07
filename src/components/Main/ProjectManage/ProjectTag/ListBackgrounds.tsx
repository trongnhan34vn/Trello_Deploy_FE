import React, { useContext, useEffect, useState } from 'react';
import Background from './Background';
import { BGContext } from './CreateTableBtn';

export default function ListBackgrounds() {
  const listBGs = useContext(BGContext);
  const [selectBG, setSelectBG] = useState<number>(0);
  const listBGElements = listBGs.map((item) => {
    return <Background selectBG={selectBG} setSelectBG={setSelectBG} key={item.id} bgUrl={item.bgUrl} bgId={item.id} />;
  });

  return <div className="grid grid-cols-4 gap-1 mb-1">{listBGElements}</div>;
}
