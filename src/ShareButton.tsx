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

export const ShareButton: React.FC<{ result: GameResult, isDaily?: boolean }> = ({result, isDaily}) => {
    let text = `🌎Postal Coordinator\n`;
    if (isDaily && result.day)
        text += `デイリーチャレンジ: ${result.day.getFullYear()}/${result.day.getMonth() + 1}/${result.day.getDate()}`;
    else
        text += `Game ID：${result.id}`;
    text += '\n---\n';
    text += `1st：誤差 ${result.stages[0].distanceKm.toFixed(0)}km\n`;
    text += `2nd：誤差 ${result.stages[1].distanceKm.toFixed(0)}km\n`;
    text += `3rd：誤差 ${result.stages[2].distanceKm.toFixed(0)}km\n`;
    text += `4th：誤差 ${result.stages[3].distanceKm.toFixed(0)}km\n`;
    text += `5th：誤差 ${result.stages[4].distanceKm.toFixed(0)}km\n`;
    text += `Total：${result.getTotalScore().toFixed(0)}/25000\n---\n`;
    text += `同じステージを遊んでみる -> `

    const url = isDaily ? `https://postalcoordinator.asalato.net?game=daily` : `https://postalcoordinator.asalato.net?game=fixed&id=${result.id}`;

    return (
        <Button
            as={TwitterIntentTweet}
            text={text}
            url={url}
            hashtags={["PostalCoordinator"]}
            colorScheme="twitter"
            leftIcon={<FaTwitter/>}>
            結果をシェアする！
        </Button>
    )
}
