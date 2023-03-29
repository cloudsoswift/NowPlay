import { useState, FocusEvent, useRef } from "react";

type Props = {
  
};
const RequestInput = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [request, setRequest] = useState("");
  const handleInputBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    if(e.target.value.length > 255) {
      inputRef.current!.value = inputRef.current!.value.slice(0, 255);
    }
    setRequest(inputRef.current!.value);
  }
  return <div>
    <div className="w-full p-4">
      <textarea onBlur={handleInputBlur} rows={5} className="w-full border" ref={inputRef} />
      { inputRef.current?.value.length } / 255
    </div>
  </div>
}

export const RequestForm = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`w-[calc(100vw-32px)] ${isOpen ? "h-[calc(100vw-32px)]" : ""} border`}>
    <div className="w-full border text-2xl p-2" onClick={()=>setIsOpen((prevState)=>!prevState)}>3. 요청사항 작성</div>
    {isOpen && <RequestInput />}
  </div>
  );
};