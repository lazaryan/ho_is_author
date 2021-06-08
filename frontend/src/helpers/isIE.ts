const isIE = (): string | boolean => {
  const ua = window.navigator.userAgent;
  return (ua.indexOf('MSIE ') > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./));
};

export default isIE;
