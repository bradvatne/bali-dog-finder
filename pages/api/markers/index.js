import dbConnect from "../../../utils/dbConnect";
import Marker from "../../../models/Marker";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const markers = await Marker.find({});
        res.status(200).json({ success: true, data: markers });
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: error });
      }
      break;
    case "POST":
      try {
        const marker = await Marker.create(req.body);
        res.status(201).json({ success: true, data: marker });
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        await Marker.deleteMany({id: req.body.id})
        res.status(201).json({ success: true})
      }
      catch (error) {
        res.status(400).json({ success: false})
      }
    default:
      res.status(400).json({ success: false });
      break;
  }
};
