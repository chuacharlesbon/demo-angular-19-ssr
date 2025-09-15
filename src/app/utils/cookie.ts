import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export function getCookie(name: string): string | null {
  const platformId = inject(PLATFORM_ID);

  // Only run in browser (document is undefined on the server)
  if (isPlatformBrowser(platformId)) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  return null; // SSR always returns null
}
