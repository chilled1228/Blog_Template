import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-gray-50 mt-16">
      {/* Footer Top */}
      <div className="footer__top py-12">
        <div className="content-wrapper">
          <div className="row">
            {/* Contact Section */}
            <div className="col__xs--12 col__sm--6 col__md--4 footer__menu mb-8 lg:mb-0">
              <h6 className="text-lg font-semibold mb-4 text-gray-800">Do you have any question?</h6>
              <p className="text-gray-600 mb-6">Contact us and we will be happy to assist you</p>
              <Link 
                href="https://support.freepik.com/hc/en-us" 
                className="button button--md inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
              >
                Contact Support
              </Link>
            </div>

            {/* Help Section */}
            <div className="col__xs--12 col__sm--3 col__md--4 footer__menu mb-8 lg:mb-0">
              <h6 className="text-lg font-semibold mb-4 text-gray-800">Help</h6>
              <ul className="space-y-3">
                <li>
                  <Link href="https://support.freepik.com/" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="https://www.freepik.com/legal/terms-of-use" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Terms & conditions
                  </Link>
                </li>
                <li>
                  <Link href="https://www.freepik.com/legal/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link href="https://www.freepik.com/legal/copyright" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Copyright information
                  </Link>
                </li>
                <li>
                  <Link href="https://www.freepik.com/legal/cookies" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Cookies policy
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Sitemap
                  </Link>
                </li>
              </ul>
              <div className="mt-4">
                <button className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Cookie Settings
                </button>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="col__xs--12 col__sm--3 col__md--4 footer__menu">
              <h6 className="text-lg font-semibold mb-4 text-gray-800">Social media</h6>
              <ul className="footer__social flex gap-3">
                <li>
                  <Link 
                    href="https://www.facebook.com/Freepik" 
                    target="_blank"
                    className="button button--sm button--flat button--icon button--icon--only button--facebook p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </Link>
                </li>
                <li>
                  <Link 
                    href="https://twitter.com/freepik" 
                    target="_blank"
                    className="button button--sm button--flat button--icon button--icon--only button--twitter p-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </Link>
                </li>
                <li>
                  <Link 
                    href="https://www.pinterest.es/freepik/" 
                    target="_blank"
                    className="button button--sm button--flat button--icon button--icon--only button--pinterest p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    aria-label="Pinterest"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.372 0 12s5.373 12 12 12 12-5.372 12-12S18.627 0 12 0zm0 19c-.721 0-1.418-.109-2.073-.312.286-.458.713-1.227.713-1.227l.389-1.46c.199.381.778.712 1.394.712 1.838 0 3.089-1.67 3.089-3.901 0-1.686-1.431-3.282-3.601-3.282-2.703 0-4.071 1.935-4.071 3.549 0 .977.369 1.845.978 2.171.1.053.152.029.175-.08l.174-.709c.021-.082.01-.112-.04-.184-.138-.197-.226-.451-.226-.811 0-1.047.784-1.984 2.042-1.984 1.114 0 1.726.681 1.726 1.592 0 1.194-.529 2.201-1.315 2.201-.434 0-.758-.359-.654-.799.124-.525.365-1.092.365-1.473 0-.339-.182-.622-.559-.622-.444 0-.8.459-.8 1.073 0 .392.132.657.132.657s-.453 1.917-.532 2.249c-.158.663-.024 1.477-.013 1.56.007.05.07.062.099.024.04-.054.563-.697.751-1.331.053-.178.303-1.186.303-1.186.15.286.588.537 1.053.537 1.387 0 2.328-1.265 2.328-2.957 0-1.28-1.083-2.467-2.73-2.467-2.048 0-3.071 1.467-3.071 2.692 0 .741.281 1.249.881 1.468.098.036.149.02.171-.055l.134-.549c.018-.07.009-.096-.034-.158-.118-.17-.194-.389-.194-.698 0-.9.674-1.704 1.756-1.704.957 0 1.483.587 1.483 1.369 0 1.028-.456 1.895-1.131 1.895-.374 0-.651-.309-.562-.688.106-.451.313-.938.313-1.263 0-.291-.156-.534-.48-.534-.38 0-.686.394-.686.921 0 .336.114.564.114.564s-.389 1.646-.457 1.931c-.136.571-.02 1.27-.01 1.34.005.043.06.053.085.021.035-.046.484-.599.645-1.145.045-.154.26-1.019.26-1.019.129.246.505.462.905.462 1.191 0 2-1.087 2-2.537 0-1.098-.93-2.118-2.344-2.118z"/>
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="https://www.instagram.com/freepik" 
                    target="_blank"
                    className="button button--sm button--flat button--icon button--icon--only button--instagram p-2 bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded hover:from-purple-700 hover:to-pink-600 transition-all"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </Link>
                </li>
                <li>
                  <Link 
                    href="https://www.youtube.com/channel/UC9wPXN2TIWoUamqONb7v8Pw" 
                    target="_blank"
                    className="button button--sm button--flat button--icon button--icon--only button--youtube p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer__bottom py-6 border-t border-gray-200">
        <div className="content-wrapper">
          <div className="row items-center">
            <div className="col mg-none flex-1">
              <div className="row row--vertical-center mg-none-i items-center">
                <Link className="logo link--text inline-block clearfix mr-6" href="https://freepik.com/">
                  <Image 
                    src="https://www.freepik.com/blog/wp-content/themes/freepik-blog/media/img/logo/freepik-company.svg" 
                    alt="Freepik Company"
                    width={191} 
                    height={32}
                    className="block h-8 w-auto"
                  />
                </Link>
                <p className="mg-none text-gray-600 text-sm">
                  © 2010-2025 Freepik Company S.L. All rights reserved.
                </p>
              </div>
            </div>
            <div className="col width-auto mg-none">
              <div className="dropdown dropdown--top-right dropdown--inverted">
                <select 
                  id="language" 
                  name="language" 
                  className="bg-transparent border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value="/" defaultValue="/">English</option>
                  <option value="/es/">Español</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Projects */}
      <div className="footer__projects bg-gray-800 text-white py-8">
        <div className="content-wrapper">
          <div className="row">
            <div className="col mg-none content">
              <p className="text-gray-300 mb-4">Freepik Company projects</p>
              <ul className="flex flex-wrap gap-6">
                <li>
                  <Link href="//www.freepik.com" className="text-white hover:text-gray-300 transition-colors" target="_blank">
                    Freepik
                  </Link>
                </li>
                <li>
                  <Link href="//www.flaticon.com" className="text-white hover:text-gray-300 transition-colors" target="_blank">
                    Flaticon
                  </Link>
                </li>
                <li>
                  <Link href="//www.slidesgo.com" className="text-white hover:text-gray-300 transition-colors" target="_blank">
                    Slidesgo
                  </Link>
                </li>
                <li>
                  <Link href="//www.wepik.com" className="text-white hover:text-gray-300 transition-colors" target="_blank">
                    Wepik
                  </Link>
                </li>
                <li>
                  <Link href="//www.videvo.net" className="text-white hover:text-gray-300 transition-colors" target="_blank">
                    Videvo
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;