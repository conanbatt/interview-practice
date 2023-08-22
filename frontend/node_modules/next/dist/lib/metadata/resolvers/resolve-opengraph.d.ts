import type { ResolvedMetadata } from '../types/metadata-interface';
import type { OpenGraph } from '../types/opengraph-types';
import type { FieldResolverExtraArgs, MetadataContext } from '../types/resolvers';
import type { Twitter } from '../types/twitter-types';
export declare function resolveImages(images: Twitter['images'], metadataBase: ResolvedMetadata['metadataBase']): NonNullable<ResolvedMetadata['twitter']>['images'];
export declare function resolveImages(images: OpenGraph['images'], metadataBase: ResolvedMetadata['metadataBase']): NonNullable<ResolvedMetadata['openGraph']>['images'];
export declare const resolveOpenGraph: FieldResolverExtraArgs<'openGraph', [
    ResolvedMetadata['metadataBase'],
    MetadataContext,
    string | null
]>;
export declare const resolveTwitter: FieldResolverExtraArgs<'twitter', [
    ResolvedMetadata['metadataBase'],
    string | null
]>;
