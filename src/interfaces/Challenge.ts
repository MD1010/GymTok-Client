export interface IChallenge {
  _id: string;
  creationTime: string;
  name: string;
  createdBy: string;
  description: string;
  estimatedScore: string;
  image: string;
  video: string;
  likes: string[];
  replies: string[]
}
