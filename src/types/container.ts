export type ContainerType = 'inline-size' | 'block-size' | 'aspect-ratio';

export type ContainerQuery =
  | `@container (min-width: ${string})`
  | `@container (max-width: ${string})`
  | `@container (width: ${string})`
  | `@container (min-height: ${string})`
  | `@container (max-height: ${string})`
  | `@container (height: ${string})`
  | `@container (min-aspect-ratio: ${number}/${number})`
  | `@container (max-aspect-ratio: ${number}/${number})`
  | `@container (aspect-ratio: ${number}/${number})`;

export interface ContainerProps {
  containerType?: ContainerType;
  containerName?: 'deep-inline-size' | 'deep-block-size' | 'deep-aspect-ratio';
  query?: ContainerQuery;
  children: React.ReactNode;
}

export type ContainerStyleProps = {
  'data-container-type'?: ContainerType;
  'data-container-name'?: string;
  'data-container-query'?: ContainerQuery;
};
