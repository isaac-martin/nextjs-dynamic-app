export default function handler(req, res) {
  console.log('isr coming in');
  res.status(200).json({message: 'ISR Running'});
}
