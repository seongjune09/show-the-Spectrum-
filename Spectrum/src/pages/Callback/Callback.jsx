import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Callback() {
    const navigate = useNavigate();

    useEffect(() => {
        // URL에서 인증 관련 파라미터 확인
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');

        console.log('Callback 페이지 useEffect 실행');
        console.log('URL params - code:', code, 'error:', error);

        if (error) {
            console.error('OAuth 인증 오류:', error);
            alert('로그인에 실패했습니다.');
            navigate('/PeriodicTable');
            return;
        }

        if (code) {
            // 백엔드에 인증 코드 전송하여 토큰 교환
            console.log('code가 있어서 handleAuthCallback 호출');
            handleAuthCallback(code);
        } else {
            // 파라미터가 없으면 바로 주기율표로 이동 (세션 확인)
            console.log('code가 없어서 checkSession 호출');
            checkSession();
        }
    }, [navigate]);

    const handleAuthCallback = async (code) => {
        try {
            console.log('handleAuthCallback 시작, code:', code);
            // 유저 데이터를 가져와 로그인 확인 후 주기율표로 이동
            const response = await fetch('https://spectrum.blleaf.page/api/user', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log('API 응답 상태:', response.status, response.ok);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('유저 데이터:', data);
            console.log('data.id:', data.id, 'data.name:', data.name);

            if (data.id && data.name) {
                // 로그인 성공 시 주기율표로 이동
                console.log('주기율표로 이동합니다.');
                navigate('/PeriodicTable');
            } else if (data.message) {
                console.log('data.message 분기:', data.message);
                alert(data.message);
                navigate('/PeriodicTable');
            } else {
                console.log('로그인 처리 오류 분기');
                alert('로그인 처리 중 오류가 발생했습니다.');
                navigate('/PeriodicTable');
            }
        } catch (error) {
            console.error('콜백 처리 오류:', error);
            alert('로그인 처리 중 오류가 발생했습니다: ' + error.message);
            navigate('/PeriodicTable');
        }
    };

    const checkSession = async () => {
        try {
            const response = await fetch('https://spectrum.blleaf.page/api/user', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.id && data.name) {
                    navigate('/PeriodicTable');
                    return;
                }
            }
            navigate('/PeriodicTable');
        } catch (error) {
            console.error('세션 확인 오류:', error);
            navigate('/PeriodicTable');
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column',
            gap: '20px'
        }}>
            <h2>로그인 처리 중...</h2>
            <div className="spinner"></div>
        </div>
    );
}
