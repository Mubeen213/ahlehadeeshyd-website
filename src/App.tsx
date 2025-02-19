import { Switch, Route } from 'wouter'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import { Toaster } from '@/components/ui/toaster'
import NotFound from '@/pages/not-found'
import PrivacyPolicy from '@/pages/privacy-policy'
import TermsOfService from '@/pages/terms-of-service'
import Navbar from '@/components/Layout/Navbar'
import Footer from '@/components/Layout/Footer'
import Landing from './components/LandingPage/Landing'
import Applicaiton from './components/ApplicationDesPage/Application'

function Router() {
  return (
    <Switch>
      <Route path='/' component={Landing} />
      <Route path='/application' component={Applicaiton} />
      <Route path='/privacy-policy' component={PrivacyPolicy} />
      <Route path='/terms-of-service' component={TermsOfService} />
      <Route component={NotFound} />
    </Switch>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Router />
      <Footer />
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
