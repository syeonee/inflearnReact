import { useState } from "react";

const DiaryItem = ({onEdit, onDelete, author, content, created_date, emotion, id}) => {
    const [isEdit, setIsEdit] = useState(false);
    const toggleIsEdit = () => setIsEdit(!isEdit);

    const [localContent, setLocalContent] = useState(content);

    const handleDelete = () => {
        if (window.confirm(`${id}번째 일기를 삭제하시겠습니까?`)) {
          onDelete(id);
        }
    }

    const handleQuitEdit = () => {
        setIsEdit(false);
        setLocalContent(content);
    }

    const handleEdit = () => {
        
        onEdit(id, localContent);
    }

    return (
      <div className="DiaryItem">
        <div className="info">
          <span className="authro_info">
            작성자 : {author} | 감정점수 : {emotion}
          </span>
          <br />
          <span className="date">
            {new Date(created_date).toLocaleString()}
          </span>
        </div>
        <div className="content">
          {isEdit ? (
            <>
              <textarea
                value={localContent}
                onChange={(e) => setLocalContent(e.target.value)}
              />
            </>
          ) : (
            <>{content}</>
          )}
        </div>
        {isEdit ? (
          <>
            <button onClick={handleQuitEdit}>수정 취소</button>
            <button onClick={handleEdit}>수정 완료</button>
          </>
        ) : (
          <>
            <button onClick={handleDelete}>삭제하기</button>
            <button onClick={toggleIsEdit}>수정하기</button>
          </>
        )}
      </div>
    );
};

export default DiaryItem;