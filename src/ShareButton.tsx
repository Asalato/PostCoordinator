import {ComponentProps, forwardRef} from "react";
import {Button} from "@chakra-ui/react";
import {FaTwitter} from "react-icons/fa";
import {getCurrentGame} from "./ScoreStore";
import {GameResult} from "./GameResult";

type TwitterIntentTweetProps = {
    text?: string;
    url?: string;
    hashtags?: string[];
    via?: string;
    related?: string[];
    in_reply_to?: string;
} & Omit<ComponentProps<"a">, "href" | "target" | "rel">;

const TwitterIntentTweet = forwardRef<HTMLAnchorElement, TwitterIntentTweetProps>(
    (
        {text, url, hashtags, via, related, in_reply_to, ...intrinsicProps},
        forwardedRef,
    ) => {
        const _url = new URL("https://twitter.com/intent/tweet");

        if (text !== undefined) _url.searchParams.set("text", text);
        if (url !== undefined) _url.searchParams.set("url", url);
        if (hashtags !== undefined) _url.searchParams.set("hashtags", hashtags.join(","));
        if (via !== undefined) _url.searchParams.set("via", via);
        if (related !== undefined) _url.searchParams.set("related", related.join(","));
        if (in_reply_to !== undefined) _url.searchParams.set("in_reply_to", in_reply_to);

        return (
            <a
                ref={forwardedRef}
                href={_url.toString()}
                target="_blank"
                rel="noopener noreferrer"
                {...intrinsicProps}
            />
        )
    }
);

export const ShareButton: React.FC<{ result: GameResult }> = ({result}) => {
    let text = `🌎Post Coordinator\nGame ID：${result.id}\n---\n`;
    for (let i = 0; i < result.stages.length; ++i) {
        text += `第${i + 1}ステージ：誤差 ${result.stages[i].distanceKm.toFixed(0)}km\n`;
    }
    text += `合計スコア：${result.getTotalScore().toFixed(0)}/25000\n---\n`;
    text += `同じステージを遊んでみる -> `

    return (
        <Button
            as={TwitterIntentTweet}
            text={text}
            url={`https://postcoordinator.asalato.net?id=${result.id}`}
            hashtags={["PostCoordinator"]}
            colorScheme="twitter"
            leftIcon={<FaTwitter/>}>
            結果をシェアする！
        </Button>
    )
}
