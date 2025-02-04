const buttonCommand = async (button: string, buttonMessageId: string) => {
  const requestHeader = {
    Authorization: `Bearer ${process.env.MY_MIDJOURNEY_API_KEY || ''}`,
    'Content-Type': 'application/json',
  };
  const buttonCommandsResponse = await fetch(
    'https://api.mymidjourney.ai/api/v1/midjourney/button',
    {
      headers: requestHeader,
      method: 'POST',
      body: JSON.stringify({
        button,
        messageId: buttonMessageId,
      }),
    },
  );

  try {
    if (!buttonCommandsResponse || !buttonCommandsResponse.ok) {
      throw new Error('Button commands failed');
    }

    const buttonCommandsResponseJson = await buttonCommandsResponse.json();
    return buttonCommandsResponseJson as {
      messageId: string;
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default buttonCommand;
