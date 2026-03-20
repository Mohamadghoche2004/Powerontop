import styled from "styled-components";

const SectionContainer = styled.div`
  width: 100%;
  padding: 4rem 1rem;
  background: white;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 400px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;

  @media (max-width: 968px) {
    min-height: 300px;
    order: 1;
  }
`;

const StoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;

  @media (max-width: 968px) {
    order: 2;
    padding: 0;
  }
`;

const StoryTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #9810fa;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const StoryText = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
  line-height: 1.8;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const LearnMoreButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, #9810fa 0%, #7c0fd9 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  align-self: flex-start;
  width: auto;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(152, 16, 250, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const AboutUsSection = () => {
  return (
    <SectionContainer>
      <ContentWrapper>
        <ImageContainer>
          <StoryImage
            src="/home/headphone.jpg"
            alt="PowerOnTop Store"
          />
        </ImageContainer>
        <ContentContainer>
          <StoryTitle>Our Story</StoryTitle>
          <StoryText>
            PowerOnTop, founded in 2024, is an electronics and home gadgets shop focused on delivering high-quality, reliable products that make everyday life smarter and easier. We carefully choose the best items to ensure performance, durability, and great value.
          </StoryText>
          <LearnMoreButton>Learn More</LearnMoreButton>
        </ContentContainer>
      </ContentWrapper>
    </SectionContainer>
  );
};
