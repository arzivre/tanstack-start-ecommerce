import { FooterNav } from '#/components/base/common/footer-nav'
import { SubscribeForm } from '#/components/base/forms/subscribe-form'

const homeMenu = [
  { label: 'Why Us', to: '/#why-us' },
  { label: 'About Us', to: '/#about' },
  { label: 'Testimonials', to: '/#testimonials' },
  { label: 'FAQ’s', to: '/#faqs' },
]

const productsMenu = [
  { label: 'Menswear', to: '/products?category=mens' },
  { label: 'Womenswear', to: '/products?category=womens' },
  { label: 'Kidswear', to: '/products?category=kids' },
]

export function FooterMiddle() {
  return (
    <div className="border-y-2 border-dashed border-body-15">
      <div className="px-4 py-10 @4xl:px-12 @5xl:py-16 @6xl:px-15 @7xl:px-20 @7xl:py-20">
        <div className="grid grid-cols-1 gap-10 @4xl:grid-cols-2 @6xl:grid-cols-3">
          {/* Home Menu */}
          <div className="font-mono text-sm tracking-wide text-body-70">
            <FooterNav title="Home" links={homeMenu} />
          </div>

          {/* Products Menu */}
          <div className="font-mono text-sm tracking-wide text-body-70">
            <FooterNav title="Products" links={productsMenu} />
          </div>

          {/* Subscribe Form */}
          <div className="space-y-4 @4xl:col-span-2 @6xl:col-span-1">
            <h4 className="text-lg font-medium text-foreground">
              Subscribe to Newsletter
            </h4>
            <SubscribeForm />
          </div>
        </div>
      </div>
    </div>
  )
}
