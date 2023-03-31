import styled, { keyframes } from "styled-components";

const StoreInfoSuspense = () => {
  console.log("뜨기는합니까?")
  return (
    <StoreInfoContainer>
      <StoreTitleHeader>
      </StoreTitleHeader>
      <StoreImageContainer>
        <StoreImageCard></StoreImageCard>
        <StoreImageCard></StoreImageCard>
        <StoreImageCard></StoreImageCard>
      </StoreImageContainer>
      <StoreTextbox>
      </StoreTextbox>
      <StoreTextbox></StoreTextbox>
      <StoreTextbox></StoreTextbox>
      <StoreTextbox></StoreTextbox>
    </StoreInfoContainer>
  );
};

export default StoreInfoSuspense;

const gradient = keyframes`
    0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StoreInfoContainer = styled.div`
  margin: 10px;
`;

const StoreTitleHeader = styled.div`
background: linear-gradient(-45deg, var(--body-color), var(--gray-color-light));
background-size: 400% 400%;
	animation: ${gradient} 2s ease infinite;
  display: flex;
  align-items: center;

  margin-bottom: 20px;

  height: calc(var(--large-text) + 15px);
  button {
    background-color: var(--primary-color);
    border-radius: 10px;
    padding: 10px;
    color: var(--body-color);
    > svg {
      font-size: var(--title-1);
    }
  }
`;

const StoreImageContainer = styled.div`

  display: flex;
  margin: 20px;
  flex-wrap: nowrap;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StoreImageCard = styled.div`
background: linear-gradient(-45deg, var(--body-color), var(--gray-color-light));
background-size: 400% 400%;
	animation: ${gradient} 2s ease infinite;
  flex: 0 0 auto;
  width: 250px;
  height: 250px;
  border-radius: 10px;
  margin-right: 10px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }
`;

const StoreTextbox = styled.div`
background: linear-gradient(-45deg, var(--body-color), var(--gray-color-light));
background-size: 400% 400%;
	animation: ${gradient} 2s ease infinite;
  height: calc(var(--body-text) + 15px);
  margin-bottom: 10px;
`;
