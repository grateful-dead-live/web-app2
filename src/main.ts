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

    // Opt-in function
    function gaOptIn() {
      var oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
      document.cookie = 'gd-cookieconsent=allow; expires="' + oneYearFromNow.toGMTString() + '"';
      window[disableStr] = false;
      window.location.reload()
    }

    // Opt-out function
    function gaOptOut() {
      document.cookie = 'gd-cookieconsent=; expires = Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = '_ga=; expires = Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = '_gid=; expires = Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = '_gat_gtag_` + TRACKINGID.replace(/-/g, '_') + `=; expires = Thu, 01 Jan 1970 00:00:00 GMT';
      window[disableStr] = true;
      window.location.reload()
    }
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
