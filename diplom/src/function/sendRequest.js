async function sendRequest(url, setItems, setCount, setError, setIsLoading){
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Что-то пошло не так...');
      }
      const data = await response.json();
      setItems(data);
      if (data.length < 6) {
        setCount(false);
      } else {
        setCount(true);
      }
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
}

export default sendRequest