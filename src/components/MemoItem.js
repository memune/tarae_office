import React, { useState } from 'react';
import MemoForm from './MemoForm';
import supabase from '../supabaseClient';
import { useNavigate } from 'react-router-dom';


const MemoItem = ({ memo, setSelectedMemo, selectedMemo, fetchMemos }) => {

  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handleMemoDelete = async () => {
    if (memo) {
      const { data, error } = await supabase
        .from('aimo')
        .delete()
        .match({ id: memo.id });

      if (error) {
        console.error('Error deleting memo:', error);
      } else {
        fetchMemos();
      }
    }
  };

  const handelClick = () => {
    setSelectedMemo(memo);
  }  

  const handleMouseEnter = () => {
    setShowDeleteButton(true);
  }

  const handleMouseLeave = () => {
    setShowDeleteButton(false);
  }

  const MAX_LENGTH = 50; // 최대 길이 값

  const truncatedContent = memo.content.length > MAX_LENGTH
  ? memo.content.substr(0, MAX_LENGTH) + '...'
  : memo.content; // 메모의 길이가 최대 길이를 초과하는 경우 일정 길이 이후에는 생략된 문자열을 추가


  const isSelected = selectedMemo && selectedMemo.id === memo.id;
  
  return (
    <div 
    className={`memo-item ${isSelected ? 'selected' : ''}`} 
    onClick={handelClick}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    >
      <p>{truncatedContent}</p> {/* memo.content 대신 truncatedContent를 사용하여 표시 */}
      {showDeleteButton && (
        <button className="delete-btn" onClick={handleMemoDelete}>
          Delete
        </button>
      )}
    </div>
  );
};

export default MemoItem;
