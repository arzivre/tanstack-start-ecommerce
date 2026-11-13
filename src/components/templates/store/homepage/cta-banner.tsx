import { CtaContainer } from '#/components/containers/store/cta-container'
import Section from '#/components/base/common/section'
import BallCircleIcon from '#/components/ui/icons/ball-circle'

export function CtaBanner() {
  return (
    <Section
      title="Elevate Your Wardrobe"
      description="Don't miss out – experience the epitome of fashion by clicking 'Buy Now' and embrace a world of chic elegance delivered to your doorstep. Your style journey begins here."
      containerClassName="bg-primary-70 border-transparent"
      rightAsset={
        <BallCircleIcon className="h-24 opacity-30 @5xl:h-79 @5xl:w-75.25 @6xl:h-96.5 @6xl:w-126.5" />
      }
      rightAssetClassName="@5xl:translate-x-4 @6xl:translate-x-10"
      rightAction={<CtaContainer inline />}
      headingClassName="text-background"
      descriptionClassName="text-dark-12"
    >
      <div />
    </Section>
  )
}
