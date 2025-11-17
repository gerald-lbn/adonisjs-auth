import { PropsWithChildren } from 'react'

interface AuthLayoutProps extends PropsWithChildren {
  heading: string
  subheading: string
}

export default function AuthLayout({ heading, subheading, children }: AuthLayoutProps) {
  return (
    <main className="grid min-h-screen grid-cols-1 bg-primary">
      <div className="flex flex-col bg-primary">
        <div className="flex flex-1 justify-center px-4 py-12 md:items-center md:px-8 md:py-0">
          <div className="flex w-full flex-col gap-8 sm:max-w-90">
            <div className="flex flex-col gap-6 md:gap-20">
              {/* Logo */}
              <div className="h-8"></div>

              {/* Heading */}
              <div className="flex flex-col gap-2 md:gap-3">
                <h1 className="text-display-xs font-semibold text-primary md:text-display-md">
                  {heading}
                </h1>
                <p className="text-md text-tertiary">{subheading}.</p>
              </div>
            </div>

            {children}
          </div>
        </div>
      </div>
    </main>
  )
}
