import type { Metadata, ResolvedMetadata, ResolvingMetadata } from './types/metadata-interface';
import type { GetDynamicParamFromSegment } from '../../server/app-render/app-render';
import type { ComponentsType } from '../../build/webpack/loaders/next-app-loader';
import type { MetadataContext } from './types/resolvers';
import { LoaderTree } from '../../server/lib/app-dir-module';
type StaticMetadata = Awaited<ReturnType<typeof resolveStaticMetadata>>;
type MetadataResolver = (_parent: ResolvingMetadata) => Metadata | Promise<Metadata>;
export type MetadataItems = [
    Metadata | MetadataResolver | null,
    StaticMetadata
][];
declare function resolveStaticMetadata(components: ComponentsType, props: any): Promise<{
    icon: any[] | undefined;
    apple: any[] | undefined;
    openGraph: any[] | undefined;
    twitter: any[] | undefined;
    manifest: string | undefined;
} | null>;
export declare function collectMetadata({ tree, metadataItems, errorMetadataItem, props, route, errorConvention, }: {
    tree: LoaderTree;
    metadataItems: MetadataItems;
    errorMetadataItem: MetadataItems[number];
    props: any;
    route: string;
    errorConvention?: 'not-found';
}): Promise<void>;
export declare function resolveMetadataItems({ tree, parentParams, metadataItems, errorMetadataItem, treePrefix, getDynamicParamFromSegment, searchParams, errorConvention, }: {
    tree: LoaderTree;
    parentParams: {
        [key: string]: any;
    };
    metadataItems: MetadataItems;
    errorMetadataItem: MetadataItems[number];
    /** Provided tree can be nested subtree, this argument says what is the path of such subtree */
    treePrefix?: string[];
    getDynamicParamFromSegment: GetDynamicParamFromSegment;
    searchParams: {
        [key: string]: any;
    };
    errorConvention: 'not-found' | undefined;
}): Promise<MetadataItems>;
export declare function accumulateMetadata(metadataItems: MetadataItems, metadataContext: MetadataContext): Promise<ResolvedMetadata>;
export declare function resolveMetadata({ tree, parentParams, metadataItems, errorMetadataItem, getDynamicParamFromSegment, searchParams, errorConvention, metadataContext, }: {
    tree: LoaderTree;
    parentParams: {
        [key: string]: any;
    };
    metadataItems: MetadataItems;
    errorMetadataItem: MetadataItems[number];
    /** Provided tree can be nested subtree, this argument says what is the path of such subtree */
    treePrefix?: string[];
    getDynamicParamFromSegment: GetDynamicParamFromSegment;
    searchParams: {
        [key: string]: any;
    };
    errorConvention: 'not-found' | undefined;
    metadataContext: MetadataContext;
}): Promise<[ResolvedMetadata, any]>;
export {};
