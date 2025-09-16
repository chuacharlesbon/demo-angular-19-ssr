import { isPlatformBrowser } from '@angular/common';

export function getCookie(name: string, platformId: Object): string | null {
  if (isPlatformBrowser(platformId)) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }
  return null; // SSR fallback
}
