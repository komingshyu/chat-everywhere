import React from 'react';

import { cn } from '@/utils/v2Chat/utils';

import type { UserProfile } from '@/types/user';
import { ConversationType } from '@/types/v2Chat/chat';

import { Sidebar } from '@/components/v2Chat/sidebar';
import { SidebarList } from '@/components/v2Chat/sidebar-list';
import { buttonVariants } from '@/components/v2Chat/ui/button';
import { IconGitHub } from '@/components/v2Chat/ui/icons';
import {
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import { Badge } from './ui/badge';

type HeaderProps = {
  userProfile: UserProfile;
  startNewChat: () => void;
  conversationOnSelect: (conversationId: string) => void;
  selectedConversationId: string;
  conversations: ConversationType[];
};

export function Header({
  conversations,
  startNewChat,
  conversationOnSelect,
  selectedConversationId,
}: HeaderProps) {
  const supabase = useSupabaseClient();

  const signOutOnClick= async () => {
    await supabase.auth.signOut();
    window.location.reload();
  }

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <Sidebar onNewChatClick={startNewChat}>
          <SidebarList
            selectedConversationId={selectedConversationId}
            conversations={conversations}
            conversationOnSelect={conversationOnSelect}
          />
        </Sidebar>
      </div>
      {selectedConversationId && (
        <div className="flex flex-row font-semibold">
          <Badge variant={'outline'} className="mr-2">
            v2 Beta
          </Badge>
          <a href="https://intro.chateverywhere.app" target="_blank">
            <span className="font-serif">Chat Everywhere</span>
          </a>
        </div>
      )}
      <div className="flex items-center justify-end space-x-2">
        <a
          target="_blank"
          href="https://github.com/exploratortech/chat-everywhere"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <IconGitHub />
        </a>
        <div className={cn(buttonVariants({ variant: 'outline' }), "cursor-pointer")} onClick={signOutOnClick}>
          <span>Log out</span>
        </div>
      </div>
    </div>
  );
}
