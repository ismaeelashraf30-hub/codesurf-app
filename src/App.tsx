import { useEffect, useState } from 'react';
import { supabase } from './integrations/supabase/client';

function App() {
  const [status, setStatus] = useState<string>('جاري التحقق من الاتصال بـ Supabase...');

  useEffect(() => {
    async function checkConnection() {
      try {
        const { error } = await supabase.from('').select('*').limit(1);
        if (error && error.code !== 'PGRST204' && error.code !== '42P01') {
          setStatus(`خطأ في الاتصال: ${error.message}`);
        } else {
          setStatus('تم الاتصال بـ Supabase بنجاح! 🚀');
        }
      } catch (err: any) {
        setStatus(`فشل الاتصال: ${err.message || 'خطأ غير معروف'}`);
      }
    }

    checkConnection();
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      fontFamily: 'sans-serif',
      direction: 'rtl'
    }}>
      <h1>CodeSurf App</h1>
      <p style={{ fontSize: '1.2rem', padding: '10px 20px', borderRadius: '8px', background: '#f0f0f0' }}>
        {status}
      </p>
    </div>
  );
}

export default App;
