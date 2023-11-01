type eventType = {
  type: string;
  payload: object;
  timestamp: number;
};

class EventService {
  async send(event: eventType) {
    console.log(event);

    try {
      const response = await fetch('/api/sendEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
}

export const eventService = new EventService();
