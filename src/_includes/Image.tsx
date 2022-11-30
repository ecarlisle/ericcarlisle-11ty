import React from 'react';

type ImageProps = {
  slug: string;
  host: string;
  alt: string;
  size?: string;
};

type imageConfig = {
  size: string;
  widths: string[];
  densities: string[];
  mediaQuery: string;
  extensions: string[];
};

const imageConfigs: imageConfig[] = [
  {
    size: 'small',
    widths: ['400', '800'],
    densities: ['1x', '2x'],
    mediaQuery: '(max-width: 767px)',
    extensions: ['webp', 'avif', 'jpg'],
  },
  {
    size: 'large',
    widths: ['800'],
    densities: ['1x'],
    mediaQuery: '(min-width: 768px)',
    extensions: ['webp', 'avif', 'jpg'],
  },
];

const getSrcSet = (
  densities: string[],
  extension: string,
  host: string,
  slug: string,
  widths: string[]
): string => {
  let set: string = '';
  for (let i: number = 0; i < widths.length; i = i + 1) {
    set = set.concat(`${host}${slug}${widths[i]}.${extension} ${widths[i]}w`);
    if (i !== widths.length - 1) set = set.concat(', ');
  }
  return set;
};

// TODO: Start using.
const getConfig = (configSize: string): imageConfig => {
  const config = imageConfigs.filter((config) => config.size === configSize);
  return config[0];
};
const Image = ({ slug, host, alt, size }: ImageProps) => {
  return (
    <figure>
      <picture>
        <>
          {imageConfigs.map((config) =>
            config.extensions.map((extension) => (
              <>
                {size === undefined || size === config.size ? (
                  <source
                    srcSet={getSrcSet(
                      config.densities,
                      extension,
                      host,
                      slug,
                      config.widths
                    )}
                    media={config.mediaQuery}
                  />
                ) : null}
              </>
            ))
          )}
          <img
            srcSet={getSrcSet(
              imageConfigs[0].densities,
              'jpg',
              host,
              slug,
              imageConfigs[0].widths
            )}
            alt={alt}
            width="400"
            height="300"
          />
        </>
      </picture>
    </figure>
  );
};

export default Image;
