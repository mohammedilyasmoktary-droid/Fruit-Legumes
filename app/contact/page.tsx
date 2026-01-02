import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 py-6 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            Contactez-nous
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Nous sommes là pour répondre à toutes vos questions. N&apos;hésitez pas à nous contacter !
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Location Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-2xl md:text-3xl">📍</span>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                  Localisation
                </h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 md:space-y-4">
                <div>
                  <p className="text-xs md:text-sm text-gray-600 mb-1">Ville</p>
                  <p className="text-base md:text-lg font-semibold text-gray-900">Temara</p>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-600 mb-1">Service</p>
                  <p className="text-base md:text-lg font-medium text-green-600">
                    Livraison à Domicile
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Phone Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-2xl md:text-3xl">📞</span>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                  Téléphone
                </h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 md:space-y-4">
                <div>
                  <a
                    href="tel:+212658786929"
                    className="block text-base md:text-lg font-semibold text-green-600 hover:text-green-700 transition-colors touch-manipulation py-2"
                  >
                    06 58 78 69 29
                  </a>
                </div>
                <div>
                  <a
                    href="tel:+212654080031"
                    className="block text-base md:text-lg font-semibold text-green-600 hover:text-green-700 transition-colors touch-manipulation py-2"
                  >
                    06 54 08 00 31
                  </a>
                </div>
                <p className="text-xs md:text-sm text-gray-600 mt-3 md:mt-4">
                  Appelez-nous pour passer votre commande ou pour toute question
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Business Hours Card */}
        <Card className="mb-6 md:mb-8">
          <CardHeader>
            <div className="flex items-center gap-2 md:gap-3">
              <span className="text-2xl md:text-3xl">🕒</span>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                Horaires d&apos;ouverture
              </h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 md:space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm md:text-base font-medium text-gray-900">Lundi - Vendredi</span>
                <span className="text-xs md:text-sm text-gray-600">8h00 - 20h00</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm md:text-base font-medium text-gray-900">Samedi</span>
                <span className="text-xs md:text-sm text-gray-600">8h00 - 20h00</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm md:text-base font-medium text-gray-900">Dimanche</span>
                <span className="text-xs md:text-sm text-gray-600">9h00 - 18h00</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Info Card */}
        <Card className="mb-6 md:mb-8 bg-gradient-to-r from-green-50 to-orange-50 border-green-200">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-start gap-3 md:gap-4">
              <span className="text-3xl md:text-4xl">🚚</span>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  Livraison à Domicile
                </h3>
                <p className="text-sm md:text-base text-gray-700 mb-3 md:mb-4">
                  Nous livrons vos commandes directement chez vous à Temara et ses environs.
                </p>
                <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-600">
                  <p>• Livraison rapide et sécurisée</p>
                  <p>• Produits frais garantis</p>
                  <p>• Créneaux de livraison flexibles</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <Link href="/boutique" className="flex-1">
            <Button className="w-full text-base md:text-lg py-3 md:py-4 touch-manipulation" size="lg">
              Commander maintenant
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full text-base md:text-lg py-3 md:py-4 touch-manipulation" size="lg">
              Retour à l&apos;accueil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}




