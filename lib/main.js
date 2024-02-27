import { Sentinela } from './Sentinela'

((window, sentinelaHost) => {
  'use strict';

  const location = window.location
  const document = window.document

  var scriptEl = document.querySelector('[src*="' + sentinelaHost +'"]')
  var domain = scriptEl && scriptEl.getAttribute('data-domain')

  const sentinela = new Sentinela({
    apiDomain: sentinelaHost,
    host: sentinelaHost
  })

  window.Sentinela = sentinela;

  window.Sentinela.start()

})(window, 'http://localhost:3000');