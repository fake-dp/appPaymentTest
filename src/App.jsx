import React, { useRef } from 'react';

function App() {
  const formRef = useRef();

  const goodsName = 'test상품입니다.';
  const amt = 1004;
  const moid = 'nice_api_test_3.0';


  function nicepayStart() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const url = "https://www.noteggdev.co.kr/payRequest_link.php"; // 요청을 보낼 서버의 URL
    const data = {
      price: amt, // 예: totalPrice 상태에서 가져온 값
      moid: moid, // 예: moid 상태에서 가져온 값
      goodsName: goodsName, // 예: goodsName 상태에서 가져온 값
      link:'Y'
    };

    const formData = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');


    if (isMobile) {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      })
      .then(data => {
        console.log('Success:', data);
          formRef.current.action = "https://www.noteggdev.co.kr/payRequest_link.php";
          formRef.current.acceptCharset = 'euc-kr';
          formRef.current.submit();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }else{
      alert('커맨드 + 옵션 + J 키를 통해 모바일 반응형으로 바꿔서 해주세요');
    }
  }

  return (
    <div className="App">
    <div>
      <p>이사님! 우선 더미데이터로 이사님 php서버로 데이터 넘겼어요!</p>
      <p>웹용 결제창과 앱용 결제창을 달라요 이건 앱용 결제창 띄우는거 하는거예요</p>
      <p>결제창 띄우는것만 해주시면 나머지는 실제 배포를 통해 할수 있을것같아요</p>
      <p>무조건 모바일 반응형으로 해서 진행해주세요!</p>
    </div>
    <button onClick={nicepayStart}>결제하기</button>
    <form name="payForm" method="post" 
        ref={formRef} acceptCharset="euc-kr">
        <input type="hidden" name="GoodsName" value={goodsName} />
        <input type="hidden" name="Amt" value={amt} />
        <input type="hidden" name="Moid" value={moid} />
      </form>
    </div>
  );
}

export default App;
