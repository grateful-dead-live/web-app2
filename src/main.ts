import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { TRACKINGID } from './app/config';

if (environment.production) {
  enableProdMode();
}

document.write(`
  <script type="text/javascript">
    // Set to the same value as the web property used on the site
    var gaProperty = "` + TRACKINGID + `";

    // Disable tracking if the opt-out cookie exists.
    var disableStr = 'ga-disable-' + gaProperty;

    // if (document.cookie.indexOf(disableStr + '=true') > -1) {
    if (document.cookie.indexOf('gd-cookieconsent=') < 0) {
      //alert('revoke!');
      window[disableStr] = true;
    }

    // Opt-out function
    // function gaOptout() {
    //  document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
    //  window[disableStr] = true;
    // }
  </script>

  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  </script>


  <script src="https://cdn.auth0.com/js/lock/11.23.1/lock.min.js"></script>
`);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
