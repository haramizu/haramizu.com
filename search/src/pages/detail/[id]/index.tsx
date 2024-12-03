import { useRouter } from "next/router";
import Image from "next/image";
import type { ArticleModel } from "@/widgets/SearchResults";
import type { SearchResultsInitialState } from "@sitecore-search/react";
import {
  FilterEqual,
  WidgetDataType,
  useSearchResults,
  widget,
} from "@sitecore-search/react";
import Link from "next/link";

type ArticleDetailProps = {
  id: string;
};

type InitialState = SearchResultsInitialState<"itemsPerPage">;

const ArticleDetailComponent = ({ id }: ArticleDetailProps): JSX.Element => {
  const {
    queryResult: { data: { content: articles = [] } = {} },
  } = useSearchResults<ArticleModel, InitialState>({
    query: (query) => {
      const equalFilter = new FilterEqual("id", id);
      query.getRequest().setSearchFilter(equalFilter);
    },
    state: {
      itemsPerPage: 1,
    },
  });

  let mainArticle: ArticleModel = {
    id: "",
    title: "",
    url: "",
    source_id: "",
  };
  if (articles.length > 0) {
    mainArticle = articles[0];
  }

  return (
    <div className="m-7 flex">
      <div className="flex-shrink-0">
        <Image
          className="max-w-[300px]"
          src={
            mainArticle.image_url || "/search-horizontal-color-black-txt.svg"
          }
          alt={mainArticle.title || "Article Image"}
          width={500}
          height={300}
        />
      </div>
      <div className="ml-4">
        <h1 className="text-xl font-bold text-gray-700 dark:text-gray-100 w-full mb-5">
          Title: {mainArticle.name}
        </h1>
        <div className="text-left text-gray-700 dark:text-gray-100 mb-5">
          Description: {mainArticle?.description}
        </div>
        <div>
          <Link href={mainArticle?.url || "/"} target="_blank">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 float-right">
              More detail
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const ArticleDetailWidget = widget(
  ArticleDetailComponent,
  WidgetDataType.SEARCH_RESULTS,
  "content"
);

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold m-4">Detail Page</h1>
      <p className="m-4">ID: {id}</p>
      <ArticleDetailWidget id={id as string} rfkId="rfkid_7" />
    </div>
  );
}
