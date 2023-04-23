import React, { useState, useEffect } from 'react';
import MemoItem from './MemoItem';
import MemoForm from './MemoForm';
import supabase from '../supabaseClient';

const MemoList = () => {
  const [memos, setMemos] = useState([]);
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [isNewMemo, setIsNewMemo] = useState(false);

  // 메모 데이터를 불러오는 함수
  const fetchMemos = async () => {
    const { data, error } = await supabase.from('aimo').select('*').order('id', { ascending: false });

    if (error) {
      console.error('Error fetching memos:', error);
    } else {
      setMemos(data);
    }
  };

  useEffect(() => {
    fetchMemos();
  }, []);

  // const handleMemoFormSubmit = async () => {
  //   await fetchMemos();
  //   setSelectedMemo(null);
  // }

  const handleSelectMemo = (memo) => {
    setSelectedMemo(memo);
    setIsNewMemo(false);
  };

  const handleNewMemo = () => {
    setSelectedMemo(null);
    setIsNewMemo(true);
  };


  return (
    <div>
      
      <header className="app-header">
        <h1>TARAE</h1>
        <button className="newmemo-btn" onClick={handleNewMemo}>New Inspiration</button>
      </header>
      
      <div className="input-area">
        <MemoForm 
          memo={selectedMemo} 
          fetchMemos={fetchMemos} 
          isNewMemo={isNewMemo}
          setIsNewMemo={setIsNewMemo}
        /> {/* isNewMemo, setIsNewMemo 추가 */}
      </div>

      <div className="list-area">
        {memos.map((memo) => (
          <MemoItem 
            key={memo.id} 
            memo={memo} 
            setSelectedMemo={setSelectedMemo}
            onSelectMemo={handleSelectMemo}
            selectedMemo={selectedMemo}
            isSelected={selectedMemo && memo.id === selectedMemo.id}
            fetchMemos={fetchMemos}
            />
        ))}
      </div>
    </div>
  );
};

export default MemoList;