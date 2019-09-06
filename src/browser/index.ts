export const isMobile = (): Boolean => window.innerWidth < 640;

export const isTablet = (): Boolean =>
  window.innerWidth >= 640 && window.innerWidth <= 1024;

export const isDesktop = (): Boolean => !isMobile() && !isTablet();

export const currentDisplayName = (): string => {
  if (isMobile()) {
    return 'mobile';
  }

  if (isTablet()) {
    return 'tablet';
  }

  return 'desktop';
};

export default {
  isMobile,
  isTablet,
  isDesktop,
  currentDisplayName,
};
