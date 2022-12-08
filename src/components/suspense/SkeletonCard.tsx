import styled from 'styled-components';

const SkeletonCard = () => {
  let list = Array(10).fill(1);
  return (
    <Wrap>
      <Card>
        {list.map((v, i) => (
          <div className="wrap" key={i}></div>
        ))}
      </Card>
    </Wrap>
  );
};

export default SkeletonCard;

const Wrap = styled.div`
  width: 100%;
`;

const Card = styled.div`
  width: 100%;
  display: grid;
  // 기본 디스플레이에서 카드를 3개씩
  grid-template-columns: repeat(auto-fit, minmax(30%, auto));
  column-gap: 1rem;
  row-gap: 1rem;
  // 1800px 디스플레이 이상에서 카드를 4개씩
  @media (min-width: 1800px) {
    grid-template-columns: repeat(auto-fit, minmax(20%, auto));
  }
  // 950px 디스플레이 이하에서 카드를 2개씩
  @media (max-width: 950px) {
    grid-template-columns: repeat(auto-fit, minmax(40%, auto));
  }
  .wrap {
    background-color: #f5f7fa;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    height: 260px;
    animation: skeleton-gradient 1.8s infinite ease-in-out;
    @keyframes skeleton-gradient {
      0% {
        background-color: rgba(165, 165, 165, 0.1);
      }
      50% {
        background-color: rgba(165, 165, 165, 0.3);
      }
      100% {
        background-color: rgba(165, 165, 165, 0.1);
      }
    }
  }
`;
