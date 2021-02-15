import { Card } from "react-native-elements";
import styled from "styled-components";

const CardTitle = styled(Card.Title)``;

export const ChallengeCard = styled(Card)`
  ${CardTitle} {
    font-size: 10rem;
    color: red;
  }
  font-size: 1.5rem;
  flex-direction: column;
  display: flex;
  height: 30rem;
  width: 30rem;
  border-radius: 14rem !important;
`;
export const ChallengesList = styled.div`
  flex-direction: column;
  justify-content: flex-start;
`;
